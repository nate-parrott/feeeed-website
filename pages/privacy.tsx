import type { NextPage } from 'next'
import Head from 'next/head'
import Base from '../components/base'
import Header from '../components/header'
import styles from '../styles/Base.module.css'

const Privacy: NextPage = () => {
    return (
      <div>
        <Head>
          <title>Privacy Policy | feeeed app</title>
          <link rel="icon" href="/Icon.png" />
        </Head>

        <Base>
            <Header />
            <h1>Privacy Policy</h1>
            <h2>feeeed’s commitment to privacy</h2>

<p>Hi there! thank you for using the feeeed app. i hope you find the app valuable in taking control of your “phone time”, information diet and your privacy.
</p>

<p>here’s some information explaining the types of data that the app collections, and what is done with it.
</p>

<p>in summary, the feeeed app does not collect any information from you, except for anonymous usage metrics.
</p>

<h4>Some examples (not exhaustive) of data that feeeed does not collect
</h4>

<ul>
<li>Your name, email address, twitter username or other information is not collected, except if you directly communicate with us.
</li>

<li>We do not collect the specific feeds, Twitter accounts, subreddits or other data sources that you subscribe to. This information is stored only on your device.
</li>

<li>If you sign in to a third-party service within the app, such as Twitter or Gmail, the app will communicate directly with that service. Information it receives will be stored only on your device. It will not be sent to a server or otherwise collected.
</li>
</ul>

<h4>Data that feeeed does collect</h4>

<p>The app collects anonymous usage metrics. This is information like (but not limited to):
</p>

<ul>
<li>How often is the app opened?</li>
<li>How often are certain features of the app being used?</li>
</ul>

<p>This information is not personally identifiable, and is stored by <a href='https://mixpanel.com/legal/privacy-policy/'>Mixpanel.</a>
</p>

<p>As you might expect, if you communicate with us directly, we will keep that information and may use it to improve the app. 
</p>

<GoogleDisclosure />

<h4>Age limits
</h4>

<p>We don’t knowingly collect or solicit information from anyone under the age of 18. If you are under the age of 18, please do not use the service or send us any personal information.
</p>

<YouTubeDisclosure />

<h4>Updating this policy
</h4>

<p>We reserve the right to update this policy. If we do so, we will make an effort to notify you of these changes, but it’s your responsibility to read and understand it. If you continue to use the product, we’ll assume you agree with the updated policy.
</p>

<h4>Contact</h4>
<p>You can contact me for more information at nateparro2t@gmail.com</p>





        </Base>
    </div>
    )
}

const GoogleDisclosure = () => (
  <>
        <h4 id="google">Handling of Google user data</h4>
        <p>
          If you link your Gmail account to view newsletters in the app, email data is fetched by feeeed on your device and shown to you.
          Your data is stored only in the app, and protected by the security measures configured on device, like passcode, Face ID and device encryption.
        </p>
        <p>
          Data protection: Google user data is never sent to a server, transferred anywhere or otherwise collected.
        </p>
        <p>
          Retention: data isn't retained by feeeed or any third parties, except as cached on your device. Cached data can be deleted by deleting the app from your device.
        </p>
        <p>
          feeeed’s use of information received 
          from Google APIs will adhere to the <a href='https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes'>Google API Services User Data Policy</a>, including the Limited Use 
          requirements.
          Specifically, the app does not transfer any information received from Google APIs to any other service or device, under any condition.
        </p>
  </>
)

const YouTubeDisclosure = () => (
  <>
    <h4 id="youtube">Use of YouTube integration</h4>
      <p>
        feeeed includes an optional YouTube integration. 
        This integration allows you to search and subscribe to YouTube channels
        within the app.
    </p>
    <p>
      Users of the YouTube integration are subject to the <a href='http://www.google.com/policies/privacy'>Google Privacy Policy.</a>
    </p>
    <p>
      When you tap 'Search YouTube channels' within the app, your search query is transmitted to YouTube and the results are displayed within the app.
      Any subscriptions you make are stored locally within the app.
    </p>
    <p>
      feeeed does not collect, store or share with third parties any information related to your YouTube activity within the app.
    </p>
  </>
);

export default Privacy;
