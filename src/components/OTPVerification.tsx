import React, { useState, useRef, KeyboardEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { sendPhoneOtp, verifyPhoneOtp } from '../services/userService';
import { X } from 'lucide-react';
import { toast } from './ui/use-toast';
import { setLoggedIn } from '../utils/auth';

interface OTPVerificationProps {
    isOpen: boolean;
    onClose: () => void;
    onVerificationSuccess: (phone: string) => void;
    phoneNumber: string;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
    isOpen,
    onClose,
    onVerificationSuccess,
    phoneNumber
}) => {
    const [otpValues, setOtpValues] = useState(Array(6).fill(""));
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isResending, setIsResending] = useState(false);

    // Create refs for each OTP input
    const otpRefs = Array(6).fill(0).map(() => useRef<HTMLInputElement>(null));

    const handleSendOtp = async () => {
        setError("");
        setIsLoading(true);

        try {
            const number = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
            await sendPhoneOtp(number);
            setShowOtpInput(true);
            // Focus the first OTP input box
            setTimeout(() => otpRefs[0].current?.focus(), 100);
        } catch (error) {
            setError("Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        // Move to next input if value is entered
        if (value !== "" && index < 5) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === "Backspace") {
            if (otpValues[index] === "" && index > 0) {
                // Move to previous input if current is empty
                otpRefs[index - 1].current?.focus();
            }
        }
    };

    const handleVerifyOtp = async () => {
        setError("");
        const otp = otpValues.join("");

        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setIsLoading(true);
        try {
            const number = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
            const response = await verifyPhoneOtp(number, otp);

            // Store token in sessionStorage if available
            if (response && response.data && response.data.user && response.data.user.token) {
                sessionStorage.setItem('token', response.data.user.token);
                setLoggedIn(true);
            }

            onVerificationSuccess(phoneNumber);
            toast({
                title: "Phone Verified!",
                description: "Your mobile number has been verified successfully.",
                variant: "success",
            });

            onClose();
        } catch (error) {
            setError("Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        try {
            const number = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
            await sendPhoneOtp(number);
            setError("");
        } catch (error) {
            setError("Failed to resend OTP. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    const handleClose = () => {
        setOtpValues(Array(6).fill(""));
        setShowOtpInput(false);
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md mx-4">
                <CardContent className="p-6 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Verify Mobile Number
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {!showOtpInput ? (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                We'll send a verification code to <strong>{phoneNumber}</strong>
                            </p>
                            {error && (
                                <p className="text-red-500 text-sm text-center">
                                    {error}
                                </p>
                            )}
                            <Button
                                onClick={handleSendOtp}
                                className="w-full bg-green hover:bg-green text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending OTP..." : "Send OTP"}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 text-center">
                                Enter the 6-digit OTP sent to <strong>{phoneNumber}</strong>
                            </p>
                            <div className="flex justify-center gap-2">
                                {otpValues.map((value, index) => (
                                    <Input
                                        key={index}
                                        type="text"
                                        ref={otpRefs[index]}
                                        value={value}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-12 text-center text-lg font-semibold"
                                        maxLength={1}
                                        required
                                    />
                                ))}
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm text-center">
                                    {error}
                                </p>
                            )}
                            <div className="space-y-3">
                                <Button
                                    onClick={handleVerifyOtp}
                                    className="w-full bg-green hover:bg-green text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Verifying..." : "Verify OTP"}
                                </Button>
                                <Button
                                    onClick={handleResendOtp}
                                    variant="outline"
                                    className="w-full"
                                    disabled={isResending}
                                >
                                    {isResending ? "Resending..." : "Resend OTP"}
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}; 