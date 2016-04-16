var tenants = [
	{
		"_id": ObjectId('5552115ce179c39b760f7a1d'),
		"code": "DCTN",
		"name": "Dashboard Client Tenant",
		"description": "This is the dashboard client tenant",
		"oauth": {},
		"applications": [
			{
				"product": "DSBRD",
				"package": "DSBRD_CLIENT",
				"appId": ObjectId('555214e9799d20bca477c1d9'),
				"description": "This application uses the Dashboard Main Package and gives access to example03 and example04.",
				"keys": [
					{
						"key": "65c69894cb9b4d2fe650042b0a5d3c16",
						"extKeys": [
							{
								"env": "DASHBOARD",
								"extKey": "aa39b5490c4a4ed0e56d7ec1232a428f5a257e12b7fd03a25660e42c2c96ce7639dc1a86a968c83e5b40392a2c2e13a127b6a19d1b62595f2f2faa161bede3cd7cacfad3b44d44aafc062e0a07456e4a0fdaabff1fb4ffbf91434c6c8efe8d3f",
								"device": null,
								"geo": null
							},
							{
								"env": "DEV",
								"extKey": "aa39b5490c4a4ed0e56d7ec1232a428f5a257e12b7fd03a25660e42c2c96ce7639dc1a86a968c83e5b40392a2c2e13a127b6a19d1b62595f2f2faa161bede3cd7cacfad3b44d44aafc062e0a07456e4a0fdaabff1fb4ffbf91434c6c8efe8d3f",
								"device": null,
								"geo": null
							}
						],
						"config": {
							"dev": {
								"mail": {
									"from": "me@localhost.com",
									"transport": {
										"type": "sendmail",
										"options": {}
									}
								},
								"urac": {
									"hashIterations": 1024,
									"seedLength": 32,
									"link": {
										"addUser": "http://dashboard.soajs.org/#/setNewPassword",
										"changeEmail": "http://dashboard.soajs.org/#/changeEmail/validate",
										"forgotPassword": "http://dashboard.soajs.org/#/resetPassword",
										"join": "http://dashboard.soajs.org/#/join/validate"
									},
									"tokenExpiryTTL": 172800000,
									"validateJoin": true,
									"mail": {
										"join": {
											"subject": "Welcome to SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/join.tmpl"
										},
										"forgotPassword": {
											"subject": "Reset Your Password at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/forgotPassword.tmpl"
										},
										"addUser": {
											"subject": "Account Created at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/addUser.tmpl"
										},
										"changeUserStatus": {
											"subject": "Account Status changed at SOAJS",
											"content": "<p>Dear <b>{{ username }}</b>, <br />The administrator update your account status to <b>{{ status }}</b> on {{ ts|date('F jS, Y') }}.<br /><br />Regards,<br/>SOAJS Team.</p>"
										},
										"changeEmail": {
											"subject": "Change Account Email at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/changeEmail.tmpl"
										}
									}
								}
							},
							"dashboard": {
								"mail": {
									"from": "me@localhost.com",
									"transport": {
										"type": "sendmail",
										"options": {}
									}
								},
								"urac": {
									"hashIterations": 1024,
									"seedLength": 32,
									"link": {
										"addUser": "http://dashboard.soajs.org/#/setNewPassword",
										"changeEmail": "http://dashboard.soajs.org/#/changeEmail/validate",
										"forgotPassword": "http://dashboard.soajs.org/#/resetPassword",
										"join": "http://dashboard.soajs.org/#/join/validate"
									},
									"tokenExpiryTTL": 172800000,
									"validateJoin": true,
									"mail": {
										"join": {
											"subject": "Welcome to SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/join.tmpl"
										},
										"forgotPassword": {
											"subject": "Reset Your Password at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/forgotPassword.tmpl"
										},
										"addUser": {
											"subject": "Account Created at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/addUser.tmpl"
										},
										"changeUserStatus": {
											"subject": "Account Status changed at SOAJS",
											"content": "<p>Dear <b>{{ username }}</b>, <br />The administrator update your account status to <b>{{ status }}</b> on {{ ts|date('F jS, Y') }}.<br /><br />Regards,<br/>SOAJS Team.</p>"
										},
										"changeEmail": {
											"subject": "Change Account Email at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/changeEmail.tmpl"
										}
									}
								}
							}
						}
					}
				]
			}
		]
	},
	{
		"_id": ObjectId('571201d51ebf34041c0b062a'),
		"type": "client",
		"code": "JST2",
		"name": "JSConf Tenant 3",
		"description": "JSConf Tenant 3 users Product A / Gold Package",
		"oauth": {},
		"applications": [
			{
				"product": "PRODA",
				"package": "PRODA_GOLD",
				"appId": ObjectId('571201fa1ebf34041c0b062b'),
				"description": "All APIs are accessible by this tenant.",
				"_TTL": 21600000,
				"keys": [
					{
						"key": "155f530f01c5fc73383406f667612dcc",
						"extKeys": [
							{
								"extKey": "d1e3b418bb1a18f35954c590d0cf06ff2c255e7ba90b415f0dd0e6c426577a34f5faf726ddea8c4325f4b287f8915b8d82ec5f6af74c4f30fc9b295bc80edd8143ed046dafb0b66727eb6e7b55680dea1b5995fec3d14b6d03f7acbc5e78b87e",
								"device": {},
								"geo": {},
								"env": "DASHBOARD"
							}
						],
						"config": {
							"dev": {
								"style": "imfv",
								"obj": {
									"name": "mike",
									"email": "team@soajs.org"
								}
							}
						}
					}
				]
			}
		],
		"tag": "jsconf gold"
	},
	{
		"_id": ObjectId('5551aca9e179c39b760f7a1a'),
		"locked": true,
		"code": "DBTN",
		"name": "Dashboard Owner Tenant",
		"description": "this is the main dashboard tenant",
		"oauth": {},
		"applications": [
			{
				"product": "DSBRD",
				"package": "DSBRD_MAIN",
				"appId": ObjectId('5512926a7a1f0e2123f638de'),
				"description": "This application uses the Dashboard Public Package.",
				"keys": [
					{
						"key": "38145c67717c73d3febd16df38abf311",
						"extKeys": [
							{
								"extKey": "9b96ba56ce934ded56c3f21ac9bdaddc8ba4782b7753cf07576bfabcace8632eba1749ff1187239ef1f56dd74377aa1e5d0a1113de2ed18368af4b808ad245bc7da986e101caddb7b75992b14d6a866db884ea8aee5ab02786886ecf9f25e974",
								"device": null,
								"geo": null,
								"env": "DASHBOARD"
							},
							{
								"extKey": "9b96ba56ce934ded56c3f21ac9bdaddc8ba4782b7753cf07576bfabcace8632eba1749ff1187239ef1f56dd74377aa1e5d0a1113de2ed18368af4b808ad245bc7da986e101caddb7b75992b14d6a866db884ea8aee5ab02786886ecf9f25e974",
								"device": null,
								"geo": null,
								"env": "DEV"
							}
						],
						"config": {
							"dashboard": {
								"mail": {
									"from": "me@localhost.com",
									"transport": {
										"type": "sendmail",
										"options": {}
									}
								},
								"urac": {
									"hashIterations": 1024,
									"seedLength": 32,
									"link": {
										"addUser": "http://dashboard.soajs.org/#/setNewPassword",
										"changeEmail": "http://dashboard.soajs.org/#/changeEmail/validate",
										"forgotPassword": "http://dashboard.soajs.org/#/resetPassword",
										"join": "http://dashboard.soajs.org/#/join/validate"
									},
									"tokenExpiryTTL": 172800000,
									"validateJoin": true,
									"mail": {
										"join": {
											"subject": "Welcome to SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/join.tmpl"
										},
										"forgotPassword": {
											"subject": "Reset Your Password at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/forgotPassword.tmpl"
										},
										"addUser": {
											"subject": "Account Created at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/addUser.tmpl"
										},
										"changeUserStatus": {
											"subject": "Account Status changed at SOAJS",
											"content": "<p>Dear <b>{{ username }}</b>, <br />The administrator update your account status to <b>{{ status }}</b> on {{ ts|date('F jS, Y') }}.<br /><br />Regards,<br/>SOAJS Team.</p>"
										},
										"changeEmail": {
											"subject": "Change Account Email at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/changeEmail.tmpl"
										}
									}
								}
							},
							"dev": {
								"mail": {
									"from": "me@localhost.com",
									"transport": {
										"type": "sendmail",
										"options": {}
									}
								},
								"urac": {
									"hashIterations": 1024,
									"seedLength": 32,
									"link": {
										"addUser": "http://dashboard.soajs.org/#/setNewPassword",
										"changeEmail": "http://dashboard.soajs.org/#/changeEmail/validate",
										"forgotPassword": "http://dashboard.soajs.org/#/resetPassword",
										"join": "http://dashboard.soajs.org/#/join/validate"
									},
									"tokenExpiryTTL": 172800000,
									"validateJoin": true,
									"mail": {
										"join": {
											"subject": "Welcome to SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/join.tmpl"
										},
										"forgotPassword": {
											"subject": "Reset Your Password at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/forgotPassword.tmpl"
										},
										"addUser": {
											"subject": "Account Created at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/addUser.tmpl"
										},
										"changeUserStatus": {
											"subject": "Account Status changed at SOAJS",
											"content": "<p>Dear <b>{{ username }}</b>, <br />The administrator update your account status to <b>{{ status }}</b> on {{ ts|date('F jS, Y') }}.<br /><br />Regards,<br/>SOAJS Team.</p>"
										},
										"changeEmail": {
											"subject": "Change Account Email at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/changeEmail.tmpl"
										}
									}
								}
							}
						}
					}
				]
			},
			{
				"product": "DSBRD",
				"package": "DSBRD_OWNER",
				"appId": ObjectId('55cc56a3c3aca9179e5048e6'),
				"description": "This application uses the Dashboard Owner Package.",
				"keys": [
					{
						"key": "9ccfb3cdaf5f61cf0cff5c78215b2292",
						"extKeys": [
							{
								"env": "DASHBOARD",
								"extKey": "cc9390e7b7bb0a360c899aa904382def1e7cbc8886fe43c89b5541fc6ad1ec9f0dff78e327f9007c718864d7ce71076ac07223a1c59c0d180a4520200917fe9c84917cf63f1579fb66fa60c661e62e293516d0ef95eb24095d366511d2335a8d",
								"device": null,
								"geo": null
							},
							{
								"env": "DEV",
								"extKey": "cc9390e7b7bb0a360c899aa904382def1e7cbc8886fe43c89b5541fc6ad1ec9f0dff78e327f9007c718864d7ce71076ac07223a1c59c0d180a4520200917fe9c84917cf63f1579fb66fa60c661e62e293516d0ef95eb24095d366511d2335a8d",
								"device": null,
								"geo": null
							}
						],
						"config": {
							"dashboard": {
								"mail": {
									"from": "me@localhost.com",
									"transport": {
										"type": "sendmail",
										"options": {}
									}
								},
								"urac": {
									"hashIterations": 1024,
									"seedLength": 32,
									"link": {
										"addUser": "http://dashboard.soajs.org/#/setNewPassword",
										"changeEmail": "http://dashboard.soajs.org/#/changeEmail/validate",
										"forgotPassword": "http://dashboard.soajs.org/#/resetPassword",
										"join": "http://dashboard.soajs.org/#/join/validate"
									},
									"tokenExpiryTTL": 172800000,
									"validateJoin": true,
									"mail": {
										"join": {
											"subject": "Welcome to SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/join.tmpl"
										},
										"forgotPassword": {
											"subject": "Reset Your Password at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/forgotPassword.tmpl"
										},
										"addUser": {
											"subject": "Account Created at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/addUser.tmpl"
										},
										"changeUserStatus": {
											"subject": "Account Status changed at SOAJS",
											"content": "<p>Dear <b>{{ username }}</b>, <br />The administrator update your account status to <b>{{ status }}</b> on {{ ts|date('F jS, Y') }}.<br /><br />Regards,<br/>SOAJS Team.</p>"
										},
										"changeEmail": {
											"subject": "Change Account Email at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/changeEmail.tmpl"
										}
									}
								}
							},
							"dev": {
								"mail": {
									"from": "me@localhost.com",
									"transport": {
										"type": "sendmail",
										"options": {}
									}
								},
								"urac": {
									"hashIterations": 1024,
									"seedLength": 32,
									"link": {
										"addUser": "http://dashboard.soajs.org/#/setNewPassword",
										"changeEmail": "http://dashboard.soajs.org/#/changeEmail/validate",
										"forgotPassword": "http://dashboard.soajs.org/#/resetPassword",
										"join": "http://dashboard.soajs.org/#/join/validate"
									},
									"tokenExpiryTTL": 172800000,
									"validateJoin": true,
									"mail": {
										"join": {
											"subject": "Welcome to SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/join.tmpl"
										},
										"forgotPassword": {
											"subject": "Reset Your Password at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/forgotPassword.tmpl"
										},
										"addUser": {
											"subject": "Account Created at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/addUser.tmpl"
										},
										"changeUserStatus": {
											"subject": "Account Status changed at SOAJS",
											"content": "<p>Dear <b>{{ username }}</b>, <br />The administrator update your account status to <b>{{ status }}</b> on {{ ts|date('F jS, Y') }}.<br /><br />Regards,<br/>SOAJS Team.</p>"
										},
										"changeEmail": {
											"subject": "Change Account Email at SOAJS",
											"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/changeEmail.tmpl"
										}
									}
								}
							}
						}
					}
				]
			}
		]
	},
	{
		"_id": ObjectId('571200f01ebf34041c0b0626'),
		"type": "client",
		"code": "JSTE",
		"name": "JSConf Tenant 1",
		"description": "JSConf Tenant 1 uses Product A / Basic Package",
		"oauth": {
			"secret": "mypassword",
			"redirectURI": null,
			"grants": [
				"password",
				"refresh_token"
			]
		},
		"applications": [
			{
				"product": "PRODA",
				"package": "PRODA_BASIC",
				"appId": ObjectId('5712013c1ebf34041c0b0628'),
				"description": "Only Hello World APIs are accessible by this tenant.",
				"_TTL": 21600000,
				"keys": [
					{
						"key": "69bfdbb0c9ce7830b7e6088bdbd16520",
						"extKeys": [
							{
								"extKey": "9ee308d7b67d2e58a8770b99c8c0320ca6297a0e78c4e956a7abd14b30aadb292d0edf46af0fd3915e2d8200b745c0082e792ec9b7397f535bb2bef6ef046585996350d2935a5bb022df95329d1e1d5b3afb9960f968119a2460cac04d6386c7",
								"device": {},
								"geo": {},
								"env": "DASHBOARD"
							}
						],
						"config": {
							"dev": {
								"style": "simple"
							}
						}
					}
				]
			}
		],
		"tag": "jsconf basic"
	},
	{
		"_id": ObjectId('571201101ebf34041c0b0627'),
		"type": "client",
		"code": "JST1",
		"name": "JSConf Tenant 2",
		"description": "JSConf Tenant 2 users Product A / Gold Package",
		"oauth": {
			"secret": "oauthsecret",
			"redirectURI": null,
			"grants": [
				"password",
				"refresh_token"
			]
		},
		"applications": [
			{
				"product": "PRODA",
				"package": "PRODA_GOLD",
				"appId": ObjectId('571201471ebf34041c0b0629'),
				"description": "All APIs are accessible by this tenant.",
				"_TTL": 21600000,
				"keys": [
					{
						"key": "9265ab20dd23df0e1b2dcd08f1f1c3a2",
						"extKeys": [
							{
								"extKey": "4f9b4dbc4c8178a3983b8c0d42cd42d39058b38d2cf2523c3aaa302678d943def8e02a64df236a53632fd8e16f9ff9cc3bc7609f48b7be693fae9b38bf29eae6527809a2bca0bd0fd7cb098488113107221e5c8f49aaecafb5db1713142d7210",
								"device": {},
								"geo": {},
								"env": "DASHBOARD"
							}
						],
						"config": {
							"dev": {
								"style": "advanced",
								"obj": {
									"name": "mike"
								}
							}
						}
					}
				]
			}
		],
		"tag": "jsconf gold"
	}
];