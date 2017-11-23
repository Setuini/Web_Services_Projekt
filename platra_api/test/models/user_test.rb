require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'create user without password' do
    u = User.new
    u.email = "test"
    assert_raises(Exception) do
      u.save
    end
    puts("Nutzer ohne Passwort nicht angelegt.")
  end

  test 'create user without email' do
    u = User.new
    u.password = "test"
    assert_raises(Exception) do
      u.save
    end
    puts("Nutzer ohne Email nicht angelegt.")
  end


  test 'create user with same email' do
    u = User.new
    u.email = "test@test.com"
    u.password = "test"
    assert_raises(Exception) do
      u.save
    end
    puts("Nutzer mit gleicher Email nicht angelegt.")
  end

  test 'create user' do
    u = User.new
    u.password = "test"
    u.email = "test@test1.com"
    assert u.save
    puts("Nutzer erfolgreich angelegt.")
  end

end
