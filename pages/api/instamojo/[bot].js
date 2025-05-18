import axios from "axios";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId,
};

const db = (
  firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
).firestore();

const handler = async (req, res) => {
  const session = await getSession({ req });
  const { bot } = req.query;
  const headers = {
    "X-Api-Key": "test_e396650e951cdbcc3f3b2aa719b",
    "X-Auth-Token": "test_dc5af79bfc8d3d2354274ea912e",
  };

  try {
    //create a payment request
    if (req.method === "POST" && bot === "cpRequest") {
      const payload = req.body.payload;
      const given = await axios.post(
        "https://test.instamojo.com/api/1.1/payment-requests/",
        payload,
        { headers }
      );
      const dataMain = await given.data;
      res.status(200).json(dataMain);
    }
    //catching redirect url from Instamojo
    else if (req.method === "GET" && bot === "redirect") {
      const data = req.query;
      //getting payment suceess data
      if (data.payment_status === "Credit") {
        const call = await axios.get(
          `https://test.instamojo.com/api/1.1/payments/${data.payment_id}`,
          { headers }
        );
        const result = await call.data;

        //firestorestarted
        const doc = await db
          .collection("usersdata")
          .doc(session.user.email)
          .get();
        const vals = doc.data();
        const refInsert = await db
          .collection("usersdata")
          .doc(session.user.email);
        const donations = { lastsuccess: {}, lastfail: {}, alldonations: {} };

        vals
          ? refInsert.update(
              { "donations.lastsuccess": result },
              { merge: false }
            ) &&
            refInsert.set(
              {
                donations: {
                  alldonations: { [result.payment.created_at]: result },
                },
              },
              { merge: true }
            )
          : refInsert.set({ donations }, { merge: true }) &&
            refInsert.update(
              { "donations.lastsuccess": result },
              { merge: false }
            ) &&
            refInsert.set(
              {
                donations: {
                  alldonations: { [result.payment.created_at]: result },
                },
              },
              { merge: true }
            );

        res.status(200).json({ "all tests:": "database updated" });
      }
      res.status(200).json({ response: "currrently analyzing the issue" });
    }
    //firestore get
    else if (req.method === "GET" && bot === "firedbget") {
      const lastsuccess = {
        success: false,
        payment: {
          payment_id: "MOJO1803405N95752852",
          status: "Credit",
          currency: "INR",
          amount: "2500.00",
          buyer_name: "John Doe",
          buyer_phone: "+919999999999",
          buyer_email: "foo@example.com",
          shipping_address: null,
          shipping_city: null,
          shipping_state: null,
          shipping_zip: null,
          shipping_country: null,
          quantity: 1,
          unit_price: "2500.00",
          fees: "47.50",
          variants: [],
          custom_fields: {},
          affiliate_commission: "0",
          payment_request:
            "https://test.instamojo.com/api/1.1/payment-requests/39b8e3a1293d431d91f191df9767a4b2/",
          instrument_type: "NETBANKING",
          billing_instrument: "Domestic Netbanking Regular",
          tax_invoice_id: "",
          failure: null,
          payout: null,
          created_at: "2021-08-03T21:05:53.349487Z",
        },
      };
      const doc = await db
        .collection("usersdata")
        .doc(session.user.email)
        .get();
      const vals = doc.data();
      const refInsert = await db
        .collection("usersdata")
        .doc(session.user.email);
      const donations = { lastsuccess: {}, lastfail: {}, alldonations: {} };

      vals
        ? refInsert.update(
            { "donations.lastsuccess": lastsuccess },
            { merge: false }
          ) &&
          refInsert.set(
            {
              donations: {
                alldonations: { [lastsuccess.payment.created_at]: lastsuccess },
              },
            },
            { merge: true }
          )
        : refInsert.set({ donations }, { merge: true }) &&
          refInsert.update(
            { "donations.lastsuccess": lastsuccess },
            { merge: false }
          ) &&
          refInsert.set(
            {
              donations: {
                alldonations: { [lastsuccess.payment.created_at]: lastsuccess },
              },
            },
            { merge: true }
          );

      res.status(200).json({ "all tests": "databases passed" });
    }
    //firestore post
    else if (req.method === "GET" && bot === "firedbCreate") {
      const insertData = db.collection("usersdata").doc(session.user.email);

      const doc = await insertData.set({ "I am": "Sudheer" }, { merge: true });

      res.status(200).json({ request: "success" });
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export default handler;

//  //firebase api
// export default async (req, res) => {
//     const { id } = req.query;

//     try {
//       if (req.method === 'PUT') {
//         await db.collection('entries').doc(id).update({
//           ...req.body,
//           updated: new Date().toISOString(),
//         });
//       } else if (req.method === 'GET') {
//         const doc = await db.collection('entries').doc(id).get();
//         if (!doc.exists) {
//           res.status(404).end();
//         } else {
//           res.status(200).json(doc.data());
//         }
//       } else if (req.method === 'DELETE') {
//         await db.collection('entries').doc(id).delete();
//       }
//       res.status(200).end();
//     } catch (e) {
//       res.status(400).end();
//     }
//   }
