class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.boolean :published, default: false

      t.timestamps
    end
  end
end
