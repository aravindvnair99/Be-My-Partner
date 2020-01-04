const functions = require("firebase-functions"),
	express = require("express"),
	app = express(),
	admin = require("firebase-admin");

admin.initializeApp({
	credential: admin.credential.applicationDefault()
});
app.set("views", "./views");
app.set("view engine", "ejs");

var db = admin.firestore();

////////////// Start of routes by Varun //////////////

app.get("/userOnlineStores", (req, res) => {
	res.render("user/userOnlineStores");
});

app.get("/userCart", (req, res) => {
	res.render("user/userCart");
});

app.get("/userPaymentConfirm", (req, res) => {
	res.render("user/userPaymentConfirm");
});

////////////// End of routes by Varun //////////////

////////////// Start of routes by Vinayak //////////////

app.get("/userDashboard", (req, res) => {
	res.render("user/userDashboard");
});

app.get("/userOrders", (req, res) => {
	res.render("user/userOrders");
});
app.get("/userOrderDetails", (req, res) => {
	res.render("user/userOrderDetails");
});
app.get("/userSavedStores", (req, res) => {
	res.render("user/userSavedStores");
});
app.get("/storeItems", (req, res) => {
	res.render("user/storeItems");
});
app.get("/merchantDashboard", (req, res) => {
	res.render("merchant/merchantDashboard");
});
////////////// End of routes by Vinayak //////////////

app.get("/", (req, res) => {
	res.render("index");
});
app.get("/offline", (req, res) => {
	res.render("offline");
});
app.get("/storeHome", (req, res) => {
	res.render("storeHome");
});
app.get("/register", (req, res) => {
	res.render("register");
});
app.get("/userRegister", (req, res) => {
	res.render("user/userRegister");
});
app.get("/merchantRegister", (req, res) => {
	res.render("merchant/merchantRegister");
});
app.get("/merchantProfile", (req, res) => {
	res.render("merchant/merchantProfile");
});
app.get("/merchantProductList", (req, res) => {
	res.render("merchant/productList");
});
app.get("/merchantProductDetail", (req, res) => {
	res.render("merchant/productDetail");
});
app.get("/merchantCalender", (req, res) => {
	res.render("merchant/calender");
});
app.get("/merchantInlineEditor", (req, res) => {
	res.render("merchant/inlineEditor");
});
app.get("/merchantTargetSetter", (req, res) => {
	res.render("merchant/merchantTargetSetter");
});
app.get("/merchantToDoList", (req, res) => {
	res.render("merchant/merchantToDoList");
});
app.get("/merchantFileUpload", (req, res) => {
	res.render("merchant/merchantFileUpload");
});
app.get("/merchantProductComingSoon", (req, res) => {
	res.render("merchant/productComingSoon");
});
app.get("/merchantGallery", (req, res) => {
	res.render("merchant/merchantGallery");
});
app.get("/merchantChatRoom", (req, res) => {
	res.render("merchant/chatRoom");
});

app.get("/agentRegister", (req, res) => {
	res.render("shop/agentRegister");
});
app.get("/login", (req, res) => {
	res.render("login");
});
app.get("/loginMerchant", (req, res) => {
	res.render("merchant/merchantLogin");
});
app.post("/onLogin", (req, res) => {
	admin
		.auth()
		.verifyIdToken(req.body.idToken, true)
		.then((decodedToken) => {
			admin
				.auth()
				.getUser(decodedToken.uid)
				.then((userRecord) => {
					console.log(
						"Successfully fetched user data:",
						userRecord.toJSON()
					);
					if (userRecord.phoneNumber && userRecord.emailVerified) {
						return res.send({ path: "/dashboard" });
					} else if (!userRecord.emailVerified) {
						return res.send({ path: "/emailVerification" });
					} else {
						return res.send({ path: "/updateProfile" });
					}
				})
				.catch((error) => {
					console.log("Error fetching user data:", error);
					res.send("/login");
				});
			return;
		})
		.catch((error) => {
			console.log(error);
			res.send("/login");
		});
});
app.get("/emailVerification", (req, res) => {
	res.render("emailVerification");
});
app.get("/signOut", (req, res) => {
	res.render("signOut");
});
app.get("/updateProfile", (req, res) => {
	res.render("updateProfile");
});
app.post("/onUpdateProfile", (req, res) => {
	admin
		.auth()
		.updateUser(req.body.uid, {
			phoneNumber: "+91" + req.body.phoneNumber,
			password: req.body.password,
			displayName: req.body.firstName + " " + req.body.lastName,
			photoURL: req.body.photoURL
		})
		.then((userRecord) => {
			console.log("Successfully updated user", userRecord.toJSON());
			return res.redirect("/login");
		})
		.catch((error) => {
			console.log("Error updating user:", error);
		});
});
app.get("/getAllMerchants", (req, res) => {
	db.collection("merchants")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				console.log(childSnapshot.id);
			});
			res.send("Done");
			return;
		})
		.catch((err) => {
			console.log(err);
		});
});
app.get("/getAllProducts", (req, res) => {
	db.collection("products")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				console.log(childSnapshot.id);
			});
			res.send("Done");
			return;
		})
		.catch((err) => {
			console.log(err);
		});
});
app.get("/getAllBrands", (req, res) => {
	db.collection("brands")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				console.log(childSnapshot.id);
			});
			res.send("Done");
			return;
		})
		.catch((err) => {
			console.log(err);
		});
});
app.get("/getAllUsers", (req, res) => {
	db.collection("users")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				console.log(childSnapshot.id);
			});
			res.send("Done");
			return;
		})
		.catch((err) => {
			console.log(err);
		});
});
app.get("/getAllAgents", (req, res) => {
	db.collection("agents")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((childSnapshot) => {
				console.log(childSnapshot.id);
			});
			res.send("Done");
			return;
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use((req, res, next) => {
	res.status(404).render("404");
});
app.use((req, res, next) => {
	res.status(500).render("500");
});

exports.app = functions.https.onRequest(app);
