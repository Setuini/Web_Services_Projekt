class TestController < ApplicationController

	before_action :authenticate_user

	def testAuth
		puts "Authenticated"
	end

end