import React, { useState, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { setLoggedIn } from "../../utils/auth";
import { sendPhoneOtp, verifyPhoneOtp } from "../../services/userService";
import { logo } from "../../assets";

export const Login = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState("");
    const [otpValues, setOtpValues] = useState(Array(6).fill(""));
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Create refs for each OTP input
    const otpRefs = Array(6).fill(0).map(() => useRef<HTMLInputElement>(null));

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!mobileNumber.match(/^[6-9]\d{9}$/)) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }
        const number = mobileNumber.startsWith('+91')
            ? mobileNumber
            : `+91${mobileNumber}`;

        setIsLoading(true);
        try {
            await sendPhoneOtp(number);
            setShowOtpInput(true);
            // Focus the first OTP input box
            otpRefs[0].current?.focus();
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

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const otp = otpValues.join("");
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }
        const number = mobileNumber.startsWith('+91')
            ? mobileNumber
            : `+91${mobileNumber}`;
        setIsLoading(true);
        try {
            const response = await verifyPhoneOtp(number, otp);
            // Store token in sessionStorage
            if (response && response.data && response.data.user && response.data.user.token) {
                sessionStorage.setItem('token', response.data.user.token);
            }
            setLoggedIn(true);
            navigate("/");
        } catch (error) {
            setError("Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md mx-4">
                <CardContent className="p-4 sm:p-8">
                    <div className="text-center mb-6 sm:mb-8">
                        <img
                            className="mx-auto h-8 sm:h-12 w-auto mb-2 sm:mb-4"
                            src={logo}
                            alt="Vizima logo"
                        />
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Login to Vizima
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            Enter your mobile number to receive OTP
                        </p>
                    </div>

                    {!showOtpInput ? (
                        <form onSubmit={handleSendOtp} className="space-y-4 sm:space-y-6">
                            <div>
                                <Input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="bg-white text-base sm:text-lg"
                                    maxLength={10}
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs sm:text-sm text-center">
                                    {error}
                                </p>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-green hover:bg-green text-white text-sm sm:text-base py-2 sm:py-3"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending OTP..." : "Send OTP"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4 sm:space-y-6">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 text-center mb-4">
                                    Enter the 6-digit OTP sent to {mobileNumber}
                                </p>
                                <div className="flex justify-center gap-1 sm:gap-2">
                                    {otpValues.map((value, index) => (
                                        <Input
                                            key={index}
                                            type="text"
                                            ref={otpRefs[index]}
                                            value={value}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className="w-8 sm:w-12 h-8 sm:h-12 text-center text-base sm:text-xl font-semibold bg-white p-0"
                                            maxLength={1}
                                            required
                                        />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowOtpInput(false);
                                        setOtpValues(Array(6).fill(""));
                                    }}
                                    className="mt-4 text-green hover:text-green text-xs sm:text-sm font-medium w-full text-center"
                                >
                                    Change mobile number
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs sm:text-sm text-center">
                                    {error}
                                </p>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-green hover:bg-green text-white text-sm sm:text-base py-2 sm:py-3"
                                disabled={isLoading}
                            >
                                {isLoading ? "Verifying..." : "Verify OTP"}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}; 