class AddActiveToAccounts < ActiveRecord::Migration[7.1]
  def change
    add_column :accounts, :active, :boolean, default: true
  end
end
