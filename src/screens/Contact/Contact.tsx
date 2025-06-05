import { contact } from "../../assets"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react"
import { useState } from "react"
import { Textarea } from "../../components/ui/textarea"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Form submitted successfully! Check the console for the data.')
    }

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div
                className="relative h-[500px] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${contact})`,
                    backgroundPosition: 'center 30%'
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 flex h-full items-center justify-start px-12">
                    <div className="text-left text-white max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Talk. We're Here to Help!</h1>
                        <p className="text-lg mb-6 opacity-90">
                            Questions? Feedback or need to reach out? We'd love to hear from you.
                        </p>
                        <div className="text-sm opacity-80 mb-8">
                            <p>Contact Information:</p>
                            <p>support@company.com</p>
                        </div>
                        <Button className="rounded-full bg-green hover:bg-green-700 text-white px-8 py-6 text-lg">
                            Explore Properties
                        </Button>
                    </div>
                </div>
            </div>

            {/* Contact Form and Details Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit}>
                        <Card className="bg-[#E2F1E8] h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-800">Contact Form</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Mobile Number</Label>
                                    <Input
                                        id="mobile"
                                        name="mobile"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Enter your message here..."
                                        className="min-h-[120px]"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Button
                            type="submit"
                            className="w-full mt-4 bg-green hover:bg-green-700 text-white rounded-full py-6 text-lg"
                        >
                            Send Message
                        </Button>
                    </form>

                    {/* Contact Details */}
                    <Card className="bg-[#E2F1E8] h-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-gray-800">Contact Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Address:</p>
                                        <p className="text-gray-600">
                                            1234 Business Avenue<br />
                                            Suite 100, North Wing<br />
                                            Business City, BC 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-teal-600" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Email:</p>
                                        <p className="text-gray-600">support@company.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-teal-600" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Phone:</p>
                                        <p className="text-gray-600">+91 XXXXXXXXXX</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <div className="flex items-center space-x-2 mb-3">
                                    <MessageCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-medium text-gray-800">Need quick help?</span>
                                </div>
                                <Button className="w-full bg-green hover:bg-green-700 text-white rounded-full py-6 text-lg">
                                    Get Live Chat
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Location Section */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Location</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="rounded-lg overflow-hidden h-96 shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215390912878!2d-73.987844924225!3d40.75798510000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1717641234567!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Business Location"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}