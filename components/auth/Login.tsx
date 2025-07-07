'use client'

import React from 'react';
import { Button } from '../../components/ui/button'
import { Slack } from '../../public/svgs/slack';
import { Discord } from '../../public/svgs/discord';
import { Github } from '../../public/svgs/github';
import supabase from '@/utils/supabase/client';

const Login = () => {
    const loginSlack = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'slack_oidc'
        })
    }

    const loginDiscord = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'discord'
        })
    }

    const loginGithub = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github'
        })
    }

    return (
        <div className="flex flex-col space-y-4 w-96 my-auto">
            <Button onClick={loginSlack} variant="outline" className="flex justify-start p-6 rounded-lg" >
                <Slack className="h-6 w-6 fill-current" />
                <p className="font-bold ml-2 text-lg">
                    Login with Slack
                </p>
            </Button>
            <Button onClick={loginDiscord} variant="outline" className="flex justify-start p-6">
                <Discord className="h-6 w-6 fill-current" />
                <p className="font-bold ml-2 text-lg">
                    Login with Discord
                </p>
            </Button>
            <Button onClick={loginGithub} variant="outline" className="flex justify-start p-6">
                <Github className="h-6 w-6 fill-current" />
                <p className="font-bold ml-2 text-lg">
                    Login with Github
                </p>
            </Button>
        </div>
    )
}

export default Login;
