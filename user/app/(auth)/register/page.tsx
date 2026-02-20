
'use client'

import { AppIcon } from "@/components/AppIcon"
import { AppLogo } from "@/components/AppLogo"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react"

const RegisterNewUser = () => {

    const router = useRouter()

    // Fetching data
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        agreed: false,
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateUserAccount = async () => {
        setError(null);

        if (!formData.agreed) {
            alert("Please agree to Terms Of Services and Privacy Policy.")
            return
        }

        if (!formData.firstname && !formData.lastname && !formData.email) {
            alert("All Fields are required!")
            return
        }


        // data
        const payload = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            tocAgreed: formData.agreed,
            prpAgreed: formData.agreed
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL

        try {
            setError(null);
            
            // sending data to backend
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.detail || "Something Went Wrong!")
            }

            //Created
            router.push('/login')

        } catch (error: unknown) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError("Something went wrong");
            }
          } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen flex-col bg-linear-to-t from-[#edf3ff] to-[#dfdfff]">
            {/* App logo */}
            <div className="flex flex-row gap-2">
                <AppIcon />
                <AppLogo />
            </div>

            {/* Heading Content */}
            <div className="font-heading mt-5 flex justify-center items-center flex-col space-y-0">
                <h1 className="text-[36px] font-bold">Create Your Account</h1>
                <p className="font-extralight text-xl w-100 text-center">Join our curated community and enjoy the best e-commerce experience.</p>
            </div>

            {/* Inputs contianer */}
            <div className="flex flex-col justify-center items-center space-y-4 rounded-[30px] p-14 bg-[#ffffff] mt-5">
                <div className="space-y-1 font-heading">
                    <Label htmlFor="firstname" className="text-[18px]">First name</Label>
                    <Input 
                        placeholder="eg: John"
                        className="w-100 h-11 font-heading text-[14px]"
                        value={formData.firstname}
                        onChange={(e) => {
                            setFormData({...formData, firstname: e.target.value})
                        }}
                    />
                </div>
                <div className="space-y-1 font-heading">
                    <Label htmlFor="lastname" className="text-[18px]">Last name</Label>
                    <Input 
                        placeholder="eg: Doe"
                        className="w-100 h-11 font-heading text-[14px]"
                        value={formData.lastname}
                        onChange={(e) => {
                            setFormData({...formData, lastname: e.target.value})
                        }}
                    />
                </div>
                <div className="space-y-1 font-heading">
                    <Label htmlFor="email" className="text-[18px]">Email</Label>
                    <Input 
                        placeholder="eg: johndoe@gmail.com"
                        className="w-100 h-11 font-heading text-[14px]"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({...formData, email: e.target.value})
                        }}
                    />
                </div>

                {/* Terms of service and privacy policy */}
                <div className="flex flex-row gap-1 items-center">
                   <Checkbox className="border-black mb-4.5" checked={formData.agreed} onCheckedChange={(checked) => setFormData({...formData, agreed: Boolean(checked)})}/> 
                   <p className="font-heading text-[14px] w-80 text-center">By creating an account you agree to our <span className="text-purple-600 cursor-pointer" onClick={() => router.push('/toc')}>Terms Of Services</span> and <span className="text-purple-600 cursor-pointer" onClick={() => router.push('/prp')}>Privacy Policy</span>.</p>
                </div>

                {/* Button */}
                <div>
                    <Button className="font-heading text-[16px] cursor-pointer bg-purple-500 hover:bg-purple-800 w-100 h-11 rounded-[10px]" onClick={handleCreateUserAccount} disabled={loading}>
                        {loading ? "Creating..." : "Create Account"}
                    </Button>
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                </div>

                {/* Seperator */}
                <div className="flex flex-row gap-3 items-center">
                    <hr className="w-34"/>
                    <p className="font-heading text-[10px]">OR CONTINUE WITH</p>
                    <hr className="w-34"/>
                </div>

                {/* Social Logins */}
                <div className="flex flex-row space-x-2 items-center justify-center">
                    {/* Google login */}
                    <div className="font-heading text-[14px]">
                        <Button className="w-48 h-11 cursor-pointer text-[14px] pl-2 pr-2">
                            <Image 
                                src='/icons/google.png'
                                width={20}
                                height={20}
                                alt="Google Social Login Button"
                            />
                            Continue With Google
                        </Button>
                    </div>
                    {/* Github login */}
                    <div className="font-heading">
                        <Button className="w-48 h-11 cursor-pointer bg-white text-black shadow-xl hover:bg-[#f1eeee] hover:text-black text-[14px] pl-2 pr-2">
                            <Image 
                                src='/icons/github.png'
                                width={20}
                                height={20}
                                alt="Github Social Login Button"
                            />
                            Continue With Github
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterNewUser
