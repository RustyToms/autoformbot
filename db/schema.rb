# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131219160037) do

  create_table "accounts", :force => true do |t|
    t.string   "url_name",   :null => false
    t.string   "plan_type",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "accounts", ["url_name"], :name => "index_accounts_on_url_name"

  create_table "forms", :force => true do |t|
    t.integer  "account_id",         :null => false
    t.string   "name",               :null => false
    t.text     "form_text"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "url"
    t.datetime "results_checked_at"
    t.string   "notify_by"
    t.text     "emails"
  end

  add_index "forms", ["account_id"], :name => "index_forms_on_account_id"
  add_index "forms", ["name"], :name => "index_forms_on_name"

  create_table "results", :force => true do |t|
    t.integer  "form_id",    :null => false
    t.text     "result",     :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "results", ["form_id"], :name => "index_results_on_form_id"

  create_table "user_accounts", :force => true do |t|
    t.integer  "user_id",      :null => false
    t.integer  "account_id"
    t.string   "account_auth", :null => false
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "user_accounts", ["account_id"], :name => "index_user_accounts_on_account_id"
  add_index "user_accounts", ["user_id"], :name => "index_user_accounts_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
