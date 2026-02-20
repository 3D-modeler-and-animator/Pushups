"use client";

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const PUSHUP_TYPES = [
    "Strict Push Up",
    "Wide Hands Push Up",
    "Diamond Push Up",
    "Archer Push Up",
    "Sphinx Push Up",
    "Staggered Hands Push Up",
];

export function useSentinel() {
    const [isClient, setIsClient] = useState(false);
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [enforcementActive, setEnforcementActive] = useState(false);
    const [lastPushupTime, setLastPushupTime] = useState<Timestamp | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentPushupType, setCurrentPushupType] = useState(PUSHUP_TYPES[0]);

    const { toast } = useToast();

    const alarmRef = useRef<Tone.Loop<any> | null>(null);
    const synthRef = useRef<Tone.Synth<Tone.SynthOptions> | null>(null);
    const speechIntervalRef = useRef<NodeJS.Timeout | null>(null);
    
    const PUSHUP_INTERVAL_MS = 60 * 60 * 1000;

    useEffect(() => {
        setIsClient(true);
        synthRef.current = new Tone.Synth({
            oscillator: { type: 'amsine' },
            envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 },
        }).toDestination();

        alarmRef.current = new Tone.Loop(time => {
            synthRef.current?.triggerAttackRelease("C4", "8n", time);
        }, "4n");

        // Initialize last push up time to start the local timer.
        setLastPushupTime(Timestamp.now());

        return () => {
            alarmRef.current?.dispose();
            synthRef.current?.dispose();
        }
    }, []);

    useEffect(() => {
        if (!permissionsGranted || !isClient || !lastPushupTime) return;

        const timerId = setInterval(() => {
            if (Date.now() - lastPushupTime.toDate().getTime() > PUSHUP_INTERVAL_MS) {
                const randomIndex = Math.floor(Math.random() * PUSHUP_TYPES.length);
                setCurrentPushupType(PUSHUP_TYPES[randomIndex]);
                setEnforcementActive(true);
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, [permissionsGranted, isClient, lastPushupTime]);

    useEffect(() => {
        if (!permissionsGranted || !isClient) return;

        const startEnforcement = () => {
            Tone.Transport.start();
            alarmRef.current?.start(0);

            const speak = () => {
                if(window.speechSynthesis.speaking) return;
                const utterance = new SpeechSynthesisUtterance(`Stop working. Do twenty ${currentPushupType}s now.`);
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
    }, [enforcementActive, permissionsGranted, isClient, currentPushupType]);

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
        // For testing, update local state instead of Firestore.
        setLastPushupTime(Timestamp.now());
        setEnforcementActive(false);
        setIsUpdating(false);
    };

    return {
        isClient,
        permissionsGranted,
        enforcementActive,
        lastPushupTime,
        isUpdating,
        currentPushupType,
        handlePermissionsClick,
        handleDidItClick,
    };
}
