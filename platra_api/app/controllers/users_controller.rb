

class UsersController < ApplicationController

	# list all users
	def index
		before_action :authenticate
		@users = User.all
		render json: @users
	end

	# register a new user
	def register
		msg = [];
		# Check if user is registered already
		if !(User.exists?(email: params[:email]))
			# Store JSON Data from Post request into User Object
			user = User.new(:name => params[:name], :email => params[:email], :password => params[:password]);
			validate user;
			#response
			if user.save
				msg.push('User created successfully');
		    render json: { msg: msg.map(&:inspect).join(', ') }, status: 201
		  end

		#user already exists
		else
			msg.push('This E-Mail is already registered');
			render json: { msg: msg.map(&:inspect).join(', ') }, status: 422
		end
	end

end
