class NotificationMailer < ApplicationMailer
  default from: "contact@outwesttech.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notification_mailer.new_contact.subject
  #
  def new_contact(account: Account.out_west, contact:)
    @contact = contact

    mail to: account.email
  end
end
