class AddContactMethodFieldsToContacts < ActiveRecord::Migration[7.1]
  def change
    add_column :contacts, :email, :string
    add_column :contacts, :phone, :string
  end
end
