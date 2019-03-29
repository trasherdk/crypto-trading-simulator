# View tructure

## home.pug

```
default		doctype html
			html(lang="en")
			block head
home		block head
				- var title = 'Crypto Trading Simulator';
				include includes/head
				
head			head
					meta(charset="utf-8")
					meta(http-equiv="X-UA-Compatible", content="IE=edge,chrome=1")
					meta(name="viewport", content="width=device-width,initial-scale=1")

					if title
					title= title
					else
					title= pkg.name

					meta(name="description", content=pkg.description)

					link(rel="stylesheet", href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css", integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4", crossorigin="anonymous")
					link(rel="stylesheet", href="/css/app.css")


default		body.p-0
			include ../includes/header
			
header		.header.border-0.p-0
				nav.navbar.navbar-expand-lg.navbar-dark.bg-dark
					a.navbar-brand(href="/") CTS
					button.navbar-toggler(type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation")
						span.navbar-toggler-icon
					#navbarNav.collapse.navbar-collapse
						ul.navbar-nav.mr-auto
							li.nav-item
								a.nav-link(href="/market").btn.navbar-text.font-weight-bold Market
						if isConnected
							ul.navbar-nav
								li.nav-item
									a.nav-link(href="/wallet").btn.navbar-text.font-weight-bold Wallet
								li.nav-item
									a.nav-link(href="/historic").btn.navbar-text.font-weight-bold Transaction History
								li.nav-item
									a.nav-link(href="/profile").btn.navbar-text.font-weight-bold Profile
								li.nav-item
									a.nav-link(href="/logout").btn.navbar-text.font-weight-bold Logout
						else
							ul.navbar-nav
								li.nav-item.mr-2
									a.nav-link(href="/login").navbar-text Login
								li.nav-item
									a(href="/sign-up")
										button.btn.btn-outline-success.font-weight-bold Signup
default		.container-fluid
				.page-header
					block page-header
				.messages
					include ../includes/messages
					
messages			if info && info.length
						div(class='fade in alert alert-info')
							button(class='close' type='button' data-dismiss='alert') ×
							ul
								for inf in info
									li #{ inf }

					if errors && errors.length
						div(class='fade in alert alert-danger')
							button(class='close' type='button' data-dismiss='alert') ×
							ul
								for error in errors 
									li #{ error }

					if success && success.length
						div(class='fade in alert alert-success')
							button(class ='close' type='button' data-dismiss='alert') ×
							ul
								for succ in success
									li #{ succ }

					if warning && warning.length
						div(class='fade in alert alert-warning')
							button(class='close' type='button' data-dismiss='alert') ×
							ul
								for warn in warning
									li #{ warn }					
					
					
default			.content
					block content
					
home				block content
						div.row
							div.jumbotron.w-100.rounded-0
								div.container-fluid.text-center
									h2.display-4 Welcome to
									h1.display-1 Crypto Trading Simulator

							div.container.mt-5
								div.row
									div.col.text-center
										a(href="../login/").mx-2
											button(type="button").btn.btn-success.btn-outline-success.btn-lg Login
										a(href="../sign-up/").mx-2
											button(type="button").btn.btn-success.btn-lg Sign Up
								div.row.mt-5.pb-5
									div.col.text-center
										img(src="https://media.giphy.com/media/LukAHGCMfxMbK/giphy.gif")
										img(src="https://media.giphy.com/media/LukAHGCMfxMbK/giphy.gif")
										img(src="https://media.giphy.com/media/LukAHGCMfxMbK/giphy.gif")
					
default		include ../includes/footer

footer		.footer.border-0.bg-dark
				.container-fluid Copyright © #{(new Date()).getFullYear()} CTS - Mogens Melander - Louis CUVELIER - Axel DENJEAN - Marc PRIOLOT - Aurélien BOUTEILLER - Nathan LAUGA

				footer
					script(src="https://code.jquery.com/jquery-3.3.1.slim.min.js", integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo", crossorigin="anonymous")
					script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js", integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ", crossorigin="anonymous")
					script(src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js", integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm", crossorigin="anonymous")

default		include ../includes/foot

foot		//- scripts etc
```
