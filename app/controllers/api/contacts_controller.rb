class Api::ContactsController < Api::ApplicationController
  def create
    verified = verify_recaptcha(secret_key: current_account.recaptcha_secret_key)
    current_account.contacts.create(contacts_params.merge(verified: verified))
    render json: {status: "ok"}, status: :created
  end

  private

  def contacts_params
    params.permit(:name, :phone_or_email, :message)
  end
end