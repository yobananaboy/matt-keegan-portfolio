import Head from 'next/head'
import { Header, Container } from 'semantic-ui-react'
import SiteHeader from '@components/SiteHeader'
import ContactForm from '@components/ContactForm'
import { useState } from 'react'
import { getSiteInfoById } from '../utils/contentfulPosts'

export default function Contact({ info }) {

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const [submitState, updateSubmitState] = useState({
        success: false,
        error: false,
    });

    const [form, updateForm] = useState({
        name: "",
        message: "",
        email: "",
    })

    const handleChange = event => {
        updateForm({
            ...form,
            [event.target.id]: event.target.value
        });
    }
    

    const processForm = event => {
        event.preventDefault()
        fetch('/', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact", ...form }),
        })
        .then(() => {
          updateSubmitState({
              success: true,
              error: false,
          })
        })
        .catch(error => {
          updateSubmitState({
              success: false,
              error: true,
          })
        })
    }
      

    return(
        <>
            <Head>
                <title>Contact | Matt Keegan</title>
            </Head>
            <SiteHeader info={info} />
            <Container>
                <Header as="h2">Get in touch</Header>
                <p>Please get in touch by completing the form below.</p>
                <ContactForm
                    form={form}
                    submitState={submitState}
                    handleChange={handleChange}
                    processForm={processForm}
                />
            </Container>
        </>
    )
}

export async function getStaticProps({ preview = false }) {

    const infoData = await getSiteInfoById(process.env.CONTENTFUL_SITE_INFO_ID, preview)
    
    return {
      props: {
        info: infoData,
      },
    }
  }