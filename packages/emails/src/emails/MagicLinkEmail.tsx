import React, { ComponentProps } from 'react'
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlSpacer,
} from '@faire/mjml-react'
import { render } from '@faire/mjml-react/utils/render'
import { HeroImage, Text, Button, Head } from '../components'
import { SendMailOptions } from 'nodemailer'
import { sendEmail } from '../sendEmail'
import { useScopedI18n } from '../../../../apps/builder/src/locales/index'

type Props = {
  url: string
}

export const MagicLinkEmail = ({ url }: Props) => {
  
  const scopedT = useScopedI18n('magic')
  return (
    <Mjml>
    <Head />
    <MjmlBody width={600}>
      <MjmlSection padding="0">
        <MjmlColumn>
          <HeroImage src="https://cdn.specterlabs.com.br/my-talk-magic-link.png" />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection padding="0 24px" cssClass="smooth">
        <MjmlColumn>
          <Text>{scopedT('Here is your magic link')} 👇</Text>
          <MjmlSpacer />
          <Button link={url} align="center">
            {scopedT('Click here to sign in')}
          </Button>
          <Text>
            {scopedT('If you didnt request this, please ignore this email.')}
          </Text>
          <Text>
            {scopedT('Best,')}
            <br />- {scopedT('MyTalk Team.')}
          </Text>
        </MjmlColumn>
      </MjmlSection>
    </MjmlBody>
  </Mjml>
)}

export const sendMagicLinkEmail = ({
  to,
  ...props
}: Pick<SendMailOptions, 'to'> & ComponentProps<typeof MagicLinkEmail>) =>
  sendEmail({
    to,
    subject: 'Acesse o MyTalk',
    html: render(<MagicLinkEmail {...props} />).html,
  })
