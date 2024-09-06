class AddFeaturedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :featured, :boolean, default: false
  end
end
