import {Organization} from '../../../src/types'

describe('Deep linking', () => {
  beforeEach(() => {
    cy.flush()
    cy.signin()
  })

  // If you're here and the test failure you're looking at is legitimate, it probably means a page
  // that a deep link pointed to has changed. There are implications to this; docs and marketing pages
  // might use the deep link that has changed. We want to avoid having broken deep links out on the web,
  // so you'll probably need to follow-up with the docs and/or marketing teams.
  it('should be redirected to the approprate page from a shortened link', () => {
    cy.get('@org').then((org: Organization) => {
      cy.setFeatureFlags({
        deepLinking: true,
      }).then(() => {
        cy.wait(1000)
        cy.visit('/me/about')
        cy.location('pathname').should('eq', `/orgs/${org.id}/about`)

        cy.visit('/me/alerts')
        cy.location('pathname').should('eq', `/orgs/${org.id}/alerting`)

        cy.visit('/me/billing')
        cy.location('pathname').should('eq', `/orgs/${org.id}/billing`)

        cy.visit('/me/buckets')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/load-data/buckets`
        )

        cy.visit('/me/csharpclient')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/load-data/client-libraries/csharp`
        )

        cy.visit('/me/dashboards')
        cy.location('pathname').should('eq', `/orgs/${org.id}/dashboards-list`)

        cy.visit('/me/data-explorer')
        cy.location('pathname').should('eq', `/orgs/${org.id}/data-explorer`)

        cy.visit('/me/goclient')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/load-data/client-libraries/go`
        )

        cy.visit('/me/home')
        cy.location('pathname').should('eq', `/orgs/${org.id}`)

        cy.visit('/me/labels')
        cy.location('pathname').should('eq', `/orgs/${org.id}/settings/labels`)

        cy.visit('/me/load-data')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/load-data/sources`
        )

        cy.visit('/me/nodejsclient')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/load-data/client-libraries/javascript-node`
        )

        cy.visit('/me/notebooks')
        cy.location('pathname').should('eq', `/orgs/${org.id}/notebooks`)

        cy.visit('/me/pythonclient')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/load-data/client-libraries/python`
        )

        cy.visit('/me/secrets')
        cy.location('pathname').should('eq', `/orgs/${org.id}/settings/secrets`)

        cy.visit('/me/setup-golang')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/new-user-setup/golang`
        )

        cy.visit('/me/setup-nodejs')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/new-user-setup/nodejs`
        )

        cy.visit('/me/setup-python')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/new-user-setup/python`
        )

        cy.visit('/me/tasks')
        cy.location('pathname').should('eq', `/orgs/${org.id}/tasks`)

        cy.visit('/me/telegraf-mqtt')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/load-data/telegraf-plugins/mqtt_consumer`
        )

        cy.visit('/me/telegrafs')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/load-data/telegrafs`
        )

        cy.visit('/me/templates')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/settings/templates`
        )

        cy.visit('/me/tokens')
        cy.location('pathname').should('eq', `/orgs/${org.id}/load-data/tokens`)

        cy.visit('/me/usage')
        cy.location('pathname').should('eq', `/orgs/${org.id}/usage`)

        cy.visit('/me/users')
        cy.location('pathname').should('eq', `/orgs/${org.id}/users`)

        cy.visit('/me/variables')
        cy.location('pathname').should(
          'eq',
          `/orgs/${org.id}/settings/variables`
        )
      })
    })
  })
})
