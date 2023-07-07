"use client";
import { Box, FormControl, TextInput, Button, Link, IconButton} from "@primer/react";
import { useState } from "react";
import signInAuth from "@/lib/signInAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { CheckCircleFillIcon, XIcon } from "@primer/octicons-react";

export default function SignUpBox() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [passwordError, setPasswordError] = useState("");
  
    const handlePasswordChange = (e: any) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
    };
  
    const handleConfirmPasswordChange = (e: any) => {
      const newConfirmPassword = e.target.value;
      setConfirmPassword(newConfirmPassword);
      setPasswordMatch(newConfirmPassword === password);
    };
  
    const validateUsername = () => {
      if (username.length > 16) {
        setUsernameError("Username must not exceed 16 characters");
        return false;
      }
      if (username.length < 3) {
        setUsernameError("Username must be at least 3 characters");
        return false;
      }
      setUsernameError("");
      return true;
    };
  
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email format");
        return false;
      }
      setEmailError("");
      return true;
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/;
        if (!passwordRegex.test(password)) {
          setPasswordError("Password must include at least one number, one uppercase letter, one lowercase letter, and be longer than 6 characters");
          return false;
        }
        setPasswordError("");
        return true;
    };

    // const validatePasswordStrength = () => {
        
  
    const handleSignUp = () => {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
  
      if (!validateUsername() || !validateEmail()) {
        return;
      }
  
      // Proceed with sign up logic
      alert("Sign up success");
    };
  
    return (
      <Box>
        <section className="">
          <form action="" className="flex flex-col gap-2">
            <FormControl>
              <FormControl.Label>
                <p className={usernameError ? "text-gh-red-5" : ""}>Username</p>
                </FormControl.Label>
              <TextInput
                sx={{ width: "100%" }}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={validateUsername}
                validationStatus={usernameError ? "error" : undefined}
              />
              {usernameError && (
                <span className="text-gh-red-5 text-sm p-0">{usernameError}</span>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <p className={emailError ? "text-gh-red-5" : ""}>Email</p>
              </FormControl.Label>
              <TextInput
                sx={{ width: "100%" }}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                validationStatus={emailError ? "error" : undefined}
              />
              {emailError && (
                <span className="text-gh-red-5 text-sm p-0">{emailError}</span>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <TextInput
                sx={{ width: "100%" }}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <p className={passwordMatch ? "" : "text-gh-red-5"}>Confirm Password</p>
              </FormControl.Label>
              <TextInput
                sx={{ width: "100%" }}
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                validationStatus={passwordMatch ? undefined : "error"}
                className={passwordMatch ? "" : "text-gh-red-5"}
              />
              {!passwordMatch && (
                <span className="text-gh-red-5 text-sm p-0">Passwords do not match</span>
              )}
            </FormControl>
  
            <div className="flex justify-center mt-2 gap-3">
              <Button variant="primary" block onClick={handleSignUp}>
                Sign up
              </Button>
            </div>
          </form>
        </section>
      </Box>
    );
  }