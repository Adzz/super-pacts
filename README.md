# How to use Super Pact

Super Pacts listens for incoming webhooks from Mondo.

#### Users

Users are people who want to achieve their coding goals before a deadline.

Users must declare a new pledge on the web application, then send the pledged
amount to SuperPact's Mondo account with their **codewars username in the
description field.**

Ex. `ptolemybarnes`

Users can then visit "/home" to view their existing pledges.

#### Admins

For now, admins can return the payment to the user or forfeit it to Ted Cruz's
SuperPAC on the user's behalf.

If an admin is returning money for a fulfilled pledge, the admin should include
**the user's codewars username, followed by the string "fulfilled".**

Ex. `ptolemybarnes fulfilled`

If an admin is forfeting money for a failed pledge, the admin should include
the user's codewars username, followed by the string "failed".

Ex. `ptolemybarnes failed`
