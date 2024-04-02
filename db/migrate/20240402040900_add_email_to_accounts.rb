class AddEmailToAccounts < ActiveRecord::Migration[7.1]
  def change
    add_column :accounts, :email, :string
  end
end
