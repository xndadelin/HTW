import React from 'react';
import { Button } from '../../components/ui/button'
import { Slack } from '../../public/svgs/slack';
import { Discord } from '../../public/svgs/discord';
import { Github } from '../../public/svgs/github';
import supabase from '@/utils/supabase/client';

const OAuth = () => {
    const authSlack = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'slack_oidc'
        })
    }

    const authDiscord = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'discord'
        })
    }

    const authGithub = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github'
        })
    }

    return (
        <div className="flex flex-col space-y-4 w-96 my-auto">
            <Button onClick={authSlack} variant="outline" className="flex justify-start p-6 rounded-lg" >
                <Slack className="h-6 w-6 fill-current" />
                <p className="font-bold ml-2 text-lg">
                    Register with Slack
                </p>
            </Button>
            <Button onClick={authDiscord} variant="outline" className="flex justify-start p-6">
                <Discord className="h-6 w-6 fill-current" />
                <p className="font-bold ml-2 text-lg">
                    Register with Discord
                </p>
            </Button>
            <Button onClick={authGithub} variant="outline" className="flex justify-start p-6">
                <Github className="h-6 w-6 fill-current" />
                <p className="font-bold ml-2 text-lg">
                    Register with Github
                </p>
            </Button>
        </div>
    )
}

export default OAuth;