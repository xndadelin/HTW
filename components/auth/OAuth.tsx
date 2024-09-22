import React from 'react';
import { Button } from '../../components/ui/button'
import { Discord } from '../../public/svgs/discord';
import { Github } from '../../public/svgs/github';
import { Google } from '../../public/svgs/google';
import supabase from '@/utils/supabase/client';

const OAuth = () => {
    
    const authDiscord = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord'
        })

        console.log(data, error)
    }

    const authGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })

        console.log(data, error)
    }

    const authGithub = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github'
        })

        console.log(data, error)
    }

    
    return (
        <div className="flex flex-col space-y-4 w-96 my-auto">
            <Button onClick={authGoogle} variant="outline" className="flex justify-start p-6 rounded-lg" >
                <Google {...{
                    className: "h-6 w-6 fill-current",
                }} />
                <p className="font-bold ml-2 text-lg">
                    Register with Google
                </p>
            </Button>
            <Button onClick={authDiscord} variant="outline" className="flex justify-start p-6">
                <Discord {...{
                    className: "h-6 w-6 fill-current",
                }} />
                <p className="font-bold ml-2 text-lg">
                    Register with Discord
                </p>
            </Button>
            <Button onClick={authGithub} variant="outline" className="flex justify-start p-6">
                <Github {...{
                    className: "h-6 w-6 fill-current",
                }} />
                <p className="font-bold ml-2 text-lg">
                    Register with Github
                </p>
            </Button>
        </div>
    )
}

export default OAuth;