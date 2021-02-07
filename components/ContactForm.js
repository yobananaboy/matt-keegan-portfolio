import { Header, Form, Input, TextArea, Button } from "semantic-ui-react"

export default function ContactForm({ form, handleChange, processForm, submitState }) {

    return(
        <>
            {submitState.error && 
                <div>
                    <p className="form-error">There was an error submitting the form. Please try again.</p>
                </div>
            }
            {submitState.success && 
                <>
                    <Header as="h3">
                        Thank you for your submission
                    </Header>
                    <p>I'll get back to you as soon as possible</p>
                </>
            }
            {!submitState.success && 
                <form
                    className="ui form email-form"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={processForm}
                >
                    <Form.Field
                        id='name'
                        name='name'
                        control={Input}
                        label='Your name'
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <Form.Field
                        id='message'
                        name='message'
                        value={form.message}
                        control={TextArea}
                        label='Your message'
                        onChange={handleChange}
                        required
                    />
                    <Form.Field
                        id='email'
                        name='email'
                        value={form.email}
                        type='email'
                        control={Input}
                        label="You email address"
                        onChange={handleChange}
                        required
                    />
                    <Button type='submit'>Submit</Button>
                </form>
            }
       </>
    )
}