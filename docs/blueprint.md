# **App Name**: PushUp Sentinel

## Core Features:

- Realtime Firestore Monitoring: Continuously monitor 'enforcement_active' and 'last_pushup_time' fields in Firestore to trigger or halt push-up enforcement.
- Audio & Speech Activation: A user-clickable button to obtain essential browser permissions for audio autoplay and Text-to-Speech synthesis.
- Loud Alarm System: Play a prominent, looping alarm sound when 'enforcement_active' is true, ensuring it continues even when the browser tab is unfocused.
- Voice Instruction Announcements: Utilize browser Text-to-Speech (SpeechSynthesis API) to repeatedly vocalize the 'Stop working. Do ten push-ups now.' message.
- 'I DID IT' Confirmation: A high-visibility button that, upon click, ceases all audio feedback and updates 'enforcement_active' to false and 'last_pushup_time' in Firestore.
- Resilient State Management: Implement logic to prevent duplicate alarm instances and to automatically restore the correct enforcement state following page refreshes.
- Automatic Firestore Reconnection: Ensure the application automatically reconnects to Firebase Firestore if the connection is interrupted, maintaining continuous monitoring.

## Style Guidelines:

- Primary color: A high-energy, intense red (#FF4136) representing raw power and exertion.
- Background color: A dark, almost black, gray (#111111) to provide contrast and a sense of seriousness.
- Accent color: A toxic, eye-catching green (#2ECC40) for crucial calls-to-action and emphasis, signifying progress and achievement.
- All text uses 'Roboto', a strong, mechanical sans-serif, ensuring large, clear, and readable typography across the minimal interface.
- The interface features a stark, minimal layout with centrally positioned elements to ensure high visibility and reduce distractions.
- No custom icons are planned, relying instead on clear text and native browser elements for a highly focused, no-frills user experience.