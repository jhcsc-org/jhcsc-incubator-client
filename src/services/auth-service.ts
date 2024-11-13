import {
    signIn
} from 'aws-amplify/auth';

export async function login(email: string, password: string) {
    try {
        const { isSignedIn, nextStep } = await signIn({ username: email, password });
        return { success: isSignedIn, nextStep };
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, error };
    }
}