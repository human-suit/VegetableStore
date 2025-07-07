import { render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'

describe('Vegetable Shop App', () => {
  beforeEach(() => {
    render(<App />)
  })
  test('показывает loader, затем список продуктов', async () => {
    expect(screen.getAllByAltText(/loading/i)).toHaveLength(8)

    const brocolli = await screen.findByText(
      'Brocolli - 1 Kg',
      {},
      { timeout: 4000 }
    )
    expect(brocolli).toBeInTheDocument()
  })

  test('шапка содержит название и info корзины', async () => {
    expect(screen.getByText(/vegetable/i)).toBeInTheDocument()
    expect(screen.getByText(/cart/i)).toBeInTheDocument()
  })

  test('при клике на кнопку Add to cart обновляется корзина', async () => {
    await screen.findByText('Brocolli - 1 Kg', {}, { timeout: 5000 })

    const addButtons = screen.getAllByRole('button', { name: /add to card/i })
    expect(addButtons.length).toBeGreaterThan(0)

    await userEvent.click(addButtons[0])

    expect(screen.getByText(/cart/i).closest('button')).toHaveTextContent('1')
  })

  test('при клике на иконку корзины открывается popup', async () => {
    await screen.findByText('Brocolli - 1 Kg', {}, { timeout: 5000 })

    const cartButton = screen.getByRole('button', { name: /cart/i })
    await userEvent.click(cartButton)

    expect(screen.getByText('Brocolli - 1 Kg')).toBeInTheDocument()
  })
})
