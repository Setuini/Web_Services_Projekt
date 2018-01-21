class TestController < ApplicationController

	before_action :authenticate_user

	def testAuth
		msg = [];
		msg.push('Auth successfully');
		render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
	end

end