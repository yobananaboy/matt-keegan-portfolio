import { Form, Input, TextArea, Button } from "semantic-ui-react"

export default function ContactForm({ form, handleChange, processForm, submitState }) {

    return(
        <Form
            className="email-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={processForm}
        >
            {submitState.error && 
            <div>
                <p className="form-error">There was an error submitting the form. Please try again.</p>
            </div>
            }
            <Form.Field
                id='name'
                control={Input}
                label='Your name'
                value={form.name}
                onChange={handleChange}
                required
            />
            <Form.Field
                id='message'
                value={form.message}
                control={TextArea}
                label='Your message'
                onChange={handleChange}
                required
            />
            <Form.Field
                id='email'
                value={form.email}
                type='email'
                control={Input}
                label="You email address"
                onChange={handleChange}
                required
            />
            <Button type='submit'>Submit</Button>
        </Form>
    )
}