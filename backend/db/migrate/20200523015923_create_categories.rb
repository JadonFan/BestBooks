class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :list_name
      t.string :list_name_encoded

      t.timestamps
    end
  end
end
