import {config} from "dotenv"
import { Configuration, OpenAIApi } from "openai"

// button that lies in the frontend side
// const submitButton = document.querySelector('#submit')
// const apiOutputElement = document.querySelector('#output');

const apiKey = "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"

async function getMessage() {
    console.log('clicked')
    const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-0301",
                messages: [{role: "user", content: "(Limit: 45 words) Beef me very amicably but slightly sarcastically"}],
                max_tokens: 100
            })
        }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options) // await because this is async function
        const data = await response.json()
        console.log(data)
        console.log(data.choices[0].message.content) // let's gooo 
        return data.choices[0].message.content;
    } catch(error) {
        console.log(error)
    }

   
}

export {getMessage};