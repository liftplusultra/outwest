class ContactsController < ApplicationController
  def create
    verified = verify_recaptcha(secret_key: ENV.fetch("RECAPTCHA_SECRET_KEY", ""))

    respond_to do |format|
      if verified && Contact.create_in_hubspot(contacts_params)
        flash.now[:success] = "Thanks for reaching out, we'll be in contact soon."
        format.turbo_stream
      else
        flash.now.alert = "We weren't able to send your message, please try again."
        format.turbo_stream
      end
    end
  end

  private

  def contacts_params
    params.require(:contact).permit(:first_name, :last_name, :service, :email, :message)
  end
end
