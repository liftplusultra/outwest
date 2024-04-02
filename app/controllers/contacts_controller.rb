class ContactsController < ApplicationController
  def create
    # verified = verify_recaptcha(secret_key: current_account.recaptcha_secret_key)
    # current_account.contacts.create(contacts_params.merge(verified: verified))
    Account.out_west.contacts.create(contacts_params)
    sleep 4
    flash.now[:success] = "Thanks for reaching out. We'll get back to you soon."

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to root_path, notice: "Message sent, we'll reach out soon!" }
    end
  end

  private

  def contacts_params
    params.require(:contact).permit(:first_name, :last_name, :email, :phone, :message)
  end
end
