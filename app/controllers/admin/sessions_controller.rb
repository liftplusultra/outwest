class Admin::SessionsController < Admin::ApplicationController
  skip_before_action :verify_current_admin!

  def new
  end

  def create
    admin = AdminUser.find_by_email(session_params[:email])

    respond_to do |format|
      if admin.present? && admin.authenticate(session_params[:password])
        session[:admin_user_id] = admin.id
        format.turbo_stream { redirect_to admin_path, success: "Logged in." }
      else
        flash.now[:alert] = "Invalid email or password."
        format.turbo_stream { render_turbo_flashes! }
      end
    end
  end

  def destroy
    session[:admin_user_id] = nil
    redirect_to new_admin_session_path, notice: "Signed out."
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
