class ContactsController < ApplicationController
  def create
    verified = verify_recaptcha(secret_key: ENV.fetch("RECAPTCHA_SECRET_KEY", ""))

    if verified
      contact = Account.out_west.contacts.create(contacts_params)
      NotificationMailer.new_contact(contact: contact).deliver_now
    end

    respond_to do |format|
      format.html { redirect_to root_path, notice: "Message sent, we'll get back to you soon!" }
    end
  end

  private

  def contacts_params
    params.require(:contact).permit(:name, :service, :email, :message)
  end
end
