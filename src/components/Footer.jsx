import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faYoutube,
  faXTwitter,
  faInstagram,
  faFacebook,
  faPaypal,
  faCcApplePay,
  faAmazonPay,
  faCcMastercard,
} from "@fortawesome/free-brands-svg-icons"

const paymentMethods = [
  { icon: faAmazonPay, label: "Amazon Pay" },
  { icon: faCcMastercard, label: "Mastercard" },
  { icon: faPaypal, label: "PayPal" },
  { icon: faCcApplePay, label: "Apple Pay" },
]

const socialLinks = [
  { icon: faYoutube, label: "YouTube", href: "#" },
  { icon: faXTwitter, label: "X (Twitter)", href: "#" },
  { icon: faInstagram, label: "Instagram", href: "#" },
  { icon: faFacebook, label: "Facebook", href: "#" },
]

const contactInfo = [
  {
    label: "Horário de atendimento",
    value: "08:00hrs à 20:00hrs",
  },
  {
    label: "Endereço",
    value: "Rua Loja Online, número 123, Cidade Loja Online",
  },
  {
    label: "E-mail",
    value: "atendimento@lojaonline.com.br",
  },
  {
    label: "Telefone",
    value: "0800-123456",
  },
]

export function Footer() {
  return (
    <footer className="bg-sky-400 text-white mt-auto">
      {/* Top row: logo + contact info */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          {/* Logo */}
          <div className="md:w-1/4">
            <span className="text-2xl font-bold text-white">OnlineShop</span>
          </div>

          {/* Contact columns */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 flex-1 md:justify-end">
            {contactInfo.map((item) => (
              <div key={item.label} className="min-w-[140px]">
                <p className="text-xs font-semibold text-sky-100 mb-0.5">
                  {item.label}:
                </p>
                <p className="text-sm text-white leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-sky-300/50 mx-6" />

      {/* Bottom row: payment methods + social media */}
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Payment methods */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-white whitespace-nowrap">
              Formas de pagamento
            </span>
            {paymentMethods.map((method) => (
              <FontAwesomeIcon
                key={method.label}
                icon={method.icon}
                aria-label={method.label}
                className="text-white text-2xl"
              />
            ))}
          </div>

          {/* Social media */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-white whitespace-nowrap">
              Mídias sociais
            </span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-black rounded-md p-1.5 flex items-center justify-center hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className="text-white text-lg"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
