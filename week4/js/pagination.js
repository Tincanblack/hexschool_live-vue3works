export default {
	props: ["pages"],
	template: `
		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item" :class="{disabled: pages.has_pre !== true}">
					<a class="page-link" href="#" aria-label="Previous" @click.prevent="$emit('get-products', pages.current_page - 1)">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li class="page-item" :class="{active: pages.current_page === page}" v-for="page in pages.total_pages" :key="'page' + page"><a class="page-link" href="#" @click.prevent="$emit('get-products', page)">{{page}}</a></li>
				<li class="page-item" :class="{disabled: pages.has_next !== true}">
					<a class="page-link" href="#" aria-label="Next" @click.prevent="$emit('get-products', pages.current_page + 1)">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
	`,
};
