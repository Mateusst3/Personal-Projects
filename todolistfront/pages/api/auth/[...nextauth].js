import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import { post } from '../apiHandler';

const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
    ],
    callbacks:{
        async signIn({user}) {
            let body = {
                email: user.email,
                password: user.id,
                name: user.name,
              };
            post(`user/register`, undefined, body).then(res => user.id = res.id)
            return true
        }
    }
}

export default (req, res) => NextAuth(req, res, options)