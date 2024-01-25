class AddVerifiedToContacts < ActiveRecord::Migration[7.1]
  def change
    add_column :contacts, :verified, :boolean, default: true
  end
end
