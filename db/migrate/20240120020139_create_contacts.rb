class CreateContacts < ActiveRecord::Migration[7.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :phone_or_email
      t.string :message

      t.timestamps
    end
  end
end
