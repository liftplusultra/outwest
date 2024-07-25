class AddServiceToContacts < ActiveRecord::Migration[7.1]
  def change
    add_column :contacts, :service, :string
  end
end
