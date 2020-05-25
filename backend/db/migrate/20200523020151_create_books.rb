class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.belongs_to :category
      t.string :cover_pic
      t.string :title
      t.text :description
      t.string :author
      t.string :publisher
      t.string :isbn

      t.timestamps
    end
  end
end
