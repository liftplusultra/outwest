class Api::ContactsController < Api::ApplicationController
  def create
    Contact.create(contacts_params) if verify_recaptcha && valid_public_token?
    render json: {status: "ok"}, status: :created
  end

  private

  def contacts_params
    params.permit(:name, :phone_or_email, :message)
  end
end