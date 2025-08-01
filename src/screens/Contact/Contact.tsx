import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { MapPin, Mail, Phone, MessageCircle, Loader2, Send, Clock, User } from "lucide-react"
import { useState } from "react"
import { Textarea } from "../../components/ui/textarea"
import { contactService, type ContactMessageParams } from "../../api/services/contactService"
import { useToast } from "../../components/ui/use-toast"

const Contact = () => {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<Omit<ContactMessageParams, 'mobileNumber'> & { phone: string }>({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Basic validation
        if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
            toast({
                title: "Error",
                description: "Please fill in all required fields",
                variant: "destructive"
            })
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            toast({
                title: "Error",
                description: "Please enter a valid email address",
                variant: "destructive"
            })
            return
        }

        try {
            setIsSubmitting(true)
            // Map phone to mobileNumber for the API
            const { phone, ...rest } = formData
            const number = phone.startsWith('+91') ? phone : `+91${phone}`;
            await contactService.sendMessage({
                ...rest,
                mobileNumber: number
            })

            toast({
                title: "Success!",
                description: "Your message has been sent. We'll get back to you soon!",
            })

            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                message: ''
            })
        } catch (error) {
            console.error('Error sending message:', error)
            toast({
                title: "Error",
                description: "Failed to send message. Please try again later.",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="min-h-screen bg-white">
            {/* Contact Header */}
            <div className="relative py-24 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}>
                <div className="absolute inset-0 bg-black/50" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                                <div className="relative">
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="pl-10 h-12 border-gray-300 focus:border-green focus:ring-green rounded-lg"
                                        disabled={isSubmitting}
                                        required
                                    />
                                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-10 h-12 border-gray-300 focus:border-green focus:ring-green rounded-lg"
                                        disabled={isSubmitting}
                                        required
                                    />
                                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                                <div className="relative">
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="pl-10 h-12 border-gray-300 focus:border-green focus:ring-green rounded-lg"
                                        disabled={isSubmitting}
                                        required
                                    />
                                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</Label>
                                <div className="relative">
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="How can we help you?"
                                        rows={5}
                                        className="border-gray-300 focus:border-green focus:ring-green rounded-lg pl-10 pt-3"
                                        value={formData.message}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        required
                                    />
                                    <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            
                            <Button 
                                type="submit" 
                                className="w-full bg-green hover:bg-green text-white py-3 px-6 rounded-lg text-base font-medium transition-colors duration-300 flex items-center justify-center space-x-2 h-12"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                        <p className="text-gray-600 mb-8">
                            Reach out to us through any of these channels. We're available to assist you with any inquiries.
                        </p>

                        <div className="space-y-6">
                            {/* Phone */}
                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                <div className="flex items-start">
                                    <div className="bg-green p-3 rounded-full mr-4">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600 mb-2">Available 24/7 for emergencies</p>
                                        <a href="tel:+911234567890" className="text-green hover:underline font-medium">
                                            +919667300983
                                        </a>
                                    </div>
                                </div>
                            </Card>

                            {/* Email */}
                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                <div className="flex items-start">
                                    <div className="bg-green p-3 rounded-full mr-4">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600 mb-2">We'll respond as soon as possible</p>
                                        <a href="mailto:Stay@vizima.in" className="text-green hover:underline">
                                        Stay@vizima.in
                                        </a>
                                    </div>
                                </div>
                            </Card>

                            {/* Location */}
                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                <div className="flex items-start">
                                    <div className="bg-green p-3 rounded-full mr-4">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Office</h3>
                                        <p className="text-gray-600 mb-2">Visit us during business hours</p>
                                        <p className="text-gray-700">Vizima premium Girls Hostel
                                        I-110, Raipur Khadar, near Windsor Grand, sector 126,  noida</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Find Us on Map</h2>
                    <div className="rounded-xl overflow-hidden shadow-lg h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.1234567890123!2d77.3322121!3d28.5415074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzI5LjQiTiA3N8KwMTknNTUuOSJF!5e0!3m2!1sen!2sin!5m2!1sen!2sin&markers=color:red%7C28.5415074,77.3322121&markers=icon:https://maps.google.com/mapfiles/ms/icons/blue-dot.png%7C28.5415074,77.3322121"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            title="Vizima Premium Girls Hostel Location"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
