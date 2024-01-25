class AddRecaptchaKeysToAccounts < ActiveRecord::Migration[7.1]
  def change
    add_column :accounts, :recaptcha_site_key, :string
    add_column :accounts, :recaptcha_secret_key, :string
  end
end
