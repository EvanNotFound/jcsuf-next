"use client";
import { Box, FormControl, TextInput, Button, Link} from "@primer/react";

export default function SignUpBox() {
	return (
		<Box>
            <section className="">
                <form action="" className="flex flex-col gap-2">
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <TextInput sx={{width: '100%'}}/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <TextInput sx={{width: '100%'}} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <TextInput sx={{width: '100%'}} />
                    </FormControl>
                    <div className="flex justify-center mt-2 gap-3">
                        <Button variant="primary" block>Sign up</Button>

                    </div>
                </form>
            </section>
		</Box>
	);
}
