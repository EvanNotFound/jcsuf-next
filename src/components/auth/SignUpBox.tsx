"use client";
import { Box, FormControl, TextInput, Button, Link, IconButton} from "@primer/react";
import { useState } from "react";
import signInAuth from "@/lib/signInAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { CheckCircleFillIcon, XIcon } from "@primer/octicons-react";

export default function SignUpBox() {
	return (
		<Box>
            <section className="">
                <form action="" className="flex flex-col gap-2">
                    <FormControl>
                        <FormControl.Label>Username</FormControl.Label>
                        <TextInput sx={{width: '100%'}} type="email"/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <TextInput sx={{width: '100%'}} type="email"/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <TextInput sx={{width: '100%'}} type="password"/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <TextInput sx={{width: '100%'}} type="password"/>
                    </FormControl>
                    <div className="flex justify-center mt-2 gap-3">
                        <Button variant="primary" block>Sign up</Button>

                    </div>
                </form>
            </section>
		</Box>
	);
}
