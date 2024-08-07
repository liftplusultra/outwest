# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_25_215728) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.string "domain"
    t.string "public_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true
    t.string "recaptcha_site_key"
    t.string "recaptcha_secret_key"
    t.string "phone"
    t.string "email"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "name"
    t.string "phone_or_email"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.boolean "verified", default: true
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone"
    t.string "service"
    t.index ["account_id"], name: "index_contacts_on_account_id"
  end

  add_foreign_key "contacts", "accounts"
end
