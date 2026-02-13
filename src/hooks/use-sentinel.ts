"use client";

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { doc, onSnapshot, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export function useSentinel() {
    const [isClient, setIsClient] = useState(false);
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [enforcementActive, setEnforcementActive] = useState(false);
    const [lastPushupTime, setLastPushupTime] = useState<Timestamp | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const { toast } = useToast();

    const alarmRef = useRef<Tone.Loop<any> | null>(null);
    const synthRef = useRef<Tone.Synth<Tone.SynthOptions> | null>(null);
    const speechIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsClient(true);
        synthRef.current = new Tone.Synth({
            oscillator: { type: 'amsine' },
            envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 },
        }).toDestination();

        alarmRef.current = new Tone.Loop(time => {
            synthRef.current?.triggerAttackRelease("C4", "8n", time);
        }, "4n");

        return () => {
            alarmRef.current?.dispose();
            synthRef.current?.dispose();
        }
    }, []);

    useEffect(() => {
        if (!permissionsGranted || !isClient) return;

        const docRef = doc(db, 'status', 'sentinel');
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setEnforcementActive(data.enforcement_active);
                setLastPushupTime(data.last_pushup_time);
            } else {
                console.error("Sentinel document does not exist!");
                toast({
                    variant: "destructive",
                    title: "Connection Error",
                    description: "Could not find sentinel status document in Firestore.",
                });
            }
        }, (error) => {
            console.error("Firestore snapshot error:", error);
            toast({
                variant: "destructive",
                title: "Firestore Error",
                description: "Lost connection to Firestore. Trying to reconnect...",
            });
        });

        return () => unsubscribe();
    }, [permissionsGranted, isClient, toast]);

    useEffect(() => {
        if (!permissionsGranted || !isClient) return;

        const startEnforcement = () => {
            Tone.Transport.start();
            alarmRef.current?.start(0);

            const speak = () => {
                if(window.speechSynthesis.speaking) return;
                const utterance = new SpeechSynthesisUtterance("Stop working. Do ten push-ups now.");
                utterance.rate = 1;
                utterance.pitch = 0.8;
                window.speechSynthesis.speak(utterance);
            };
            
            speak();
            speechIntervalRef.current = setInterval(speak, 5000);
        };

        const stopEnforcement = () => {
            alarmRef.current?.stop();
            if(Tone.Transport.state === 'started') {
                Tone.Transport.stop();
                Tone.Transport.cancel();
            }
            if (speechIntervalRef.current) {
                clearInterval(speechIntervalRef.current);
            }
            window.speechSynthesis.cancel();
        };

        if (enforcementActive) {
            startEnforcement();
        } else {
            stopEnforcement();
        }

        return () => stopEnforcement();
    }, [enforcementActive, permissionsGranted, isClient]);

    const handlePermissionsClick = async () => {
        try {
            await Tone.start();
            const utterance = new SpeechSynthesisUtterance(" ");
            window.speechSynthesis.speak(utterance);
            setPermissionsGranted(true);
        } catch (error) {
            console.error("Error granting permissions:", error);
            toast({
                variant: "destructive",
                title: "Permission Denied",
                description: "Could not get audio permissions. Please enable them in your browser settings.",
            });
        }
    };

    const handleDidItClick = async () => {
        setIsUpdating(true);
        try {
            const docRef = doc(db, 'status', 'sentinel');
            await updateDoc(docRef, {
                enforcement_active: false,
                last_pushup_time: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error updating document: ", error);
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "Could not update status in Firestore. Please try again.",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        isClient,
        permissionsGranted,
        enforcementActive,
        lastPushupTime,
        isUpdating,
        handlePermissionsClick,
        handleDidItClick,
    };
}
